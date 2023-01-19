import React, { Dispatch } from 'react';
import { Constants } from '../utils/Constants/constants';

export interface Ipost {
  _id: string;
  title: string;
  summary: string;
  post: string;
  date: string;
  imgUrl: string;
  otherImages?: string[];
  category: 'Gündelik' | 'Örgü' | 'Kültür';
  createdAt: string;
  updatedAt: string;
  __v: number;
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

//Posting
export type Action =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_CATEGORY'; payload: 'Gündelik' | 'Örgü' | 'Kültür' }
  | { type: 'SET_POST'; payload: string }
  | { type: 'SET_IMGURL'; payload: null | File | string }
  | { type: 'SET_OTHER_IMAGES'; payload: null | FileList | string[] };

export type postState = {
  title: string;
  category: 'Gündelik' | 'Örgü' | 'Kültür';
  post: string;
  imgUrl: null | File | string;
  otherImages: null | FileList | string[];
};

export type categoryOptionSelectType = React.ChangeEvent<HTMLSelectElement> & {
  target: {
    value: 'Gündelik' | 'Örgü' | 'Kültür';
  };
};
