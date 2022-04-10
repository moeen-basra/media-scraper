import { NextFunction, Request, Response } from "express";
import { Media } from "../models";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import Root = cheerio.Root;
import logger from "../config/logger";
import { Op } from "sequelize";

type dataType = {
  title: string;
  src: string;
  type: string;
};

type filterType = {
  type?: string,
  title?: Record<string, any>
}

type queryOptions = {
  limit: number,
  offset: number,
  where?: filterType
}

const parser = (selector: Root, tag: string) => {
  const data: dataType[] = [];

  selector(tag).each(async (item, element) => {
    const src = selector(element).attr("src");

    if (src?.startsWith("http")) {
      data.push({
        title: selector(element).attr("alt") || "No title",
        src,
        type: tag === 'img' ? 'image' : tag
      })
    }
  });

  return data;
};

const parseOptions = (request: Request) => {
  let { pageSize = 15, page = 1 } = request.query;
  let offset = 0;
  if (page > 1) {
    offset = (+page - 1) * +pageSize;
  }

  return {
    limit: +pageSize,
    offset: offset
  }
}

const parseFilters = (request: Request): filterType => {
  let where: filterType = {}
  const { type, title } = request.query
  if (typeof type === 'string' && type !== '') {
    // @ts-ignore
    where['type'] = type
  }

  if (typeof title === 'string' && title !== '') {
    // @ts-ignore
    where['title'] = {
      [Op.iLike]: `%${title}%`
    }
  }

  return where

}

export const home = async (request: Request, response: Response) => {
  let options: queryOptions = parseOptions(request)
  const where = parseFilters(request)
  const query = Media

  if (where?.title || where?.type) {
    options = {...options, where}
  }

  const { count, rows } = await query.findAndCountAll(options)

  return response.json({
    total: count,
    data: rows
  })
}

export const scrape = async (
  request: Request,
  response: Response,
) => {
  const { urls } = request.body;

  if (!urls) {
    const message = "Please provide a valid list of urls";

    logger.error(message);

    response.status(422).json({
      message,
      statusCode: 422,
    });
    return;
  }

  for (let url of urls) {
    if (url === '') {
      continue
    }

    try {
      const res: void | AxiosResponse = await axios(url);
      // @ts-ignore
      const ch = cheerio.load(res.data);

      const images = parser(ch, "img");

      for (let d of images) {
        await Media.create(d);
      }

      const videos = parser(ch, "video");

      for (let d of videos) {
        await Media.create(d);
      }
    } catch (error: any) {
      logger.error(error?.message)
      return response.status(400)
        .json({
          message: error?.message
        })
    }
  }

  return response.json({
    message: "Media Parsed Successfully",
  });
};
