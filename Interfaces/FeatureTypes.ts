import { Dispatch } from 'react';

export interface Ipost {
  _id: string;
  title: string;
  summary: string;
  post: string;
  date: string;
  imgUrl: string;
  category: 'Gündelik' | 'Örgü' | 'Kültür';
}

export type FeaturedPost = {
  lastBlog: Ipost;
};

export type RecentPosts = {
  otherBlogs: Ipost[];
};

export type BlogsData = {
  blogs: Ipost[];
};

export interface Card {
  key: string;
  props: Ipost;
}

export type IpostResponse = {
  data: Array<Ipost[]>;
  error: any;
  isLoading: any;
  isValidating: any;
  mutate: any;
  size: number;
  setSize: any;
};
