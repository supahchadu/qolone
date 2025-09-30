import { defineQuery } from "next-sanity";

export const IDEA_QUERY = 
defineQuery(`*[_type == "idea" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc){
  _id, 
    title,
    slug, 
    _createdAt, 
    author->{
      _id,name,image, bio
    }, 
    reads,
    description, 
    category, 
    image,
}`);

export const IDEA_BY_ID_QUERY = 
  defineQuery(`*[_type == "idea" && _id==$id][0]{
  _id, 
    title,
    slug, 
    _createdAt, 
    author->{
      _id,user,name,image, bio
    }, 
    reads,
    description, 
    category, 
    image,
    pitch,
}`);

export const IDEA_READS_QUERY =
    defineQuery(`*[_type == "idea" && _id == $id][0]{
        _id, reads
      }`);

export const AUTHOR_BY_GITHUB_ID_QUERY =
      defineQuery(`*[_type == "author" && id== $id][0] {
        _id, 
        id, 
        name, 
        user, 
        email, 
        image,
         bio  
      }`)

export const AUTHOR_BY_ID_QUERY =
      defineQuery(`*[_type == "author" && _id== $id][0] {
        _id, 
        id, 
        name, 
        user, 
        email, 
        image,
         bio  
      }`);

export const IDEAS_BY_AUTHOR_QUERY = 
defineQuery(`*[_type == "idea" && author._ref == $id] | order(_createdAt desc){
  _id, 
    title,
    slug, 
    _createdAt, 
    author->{
      _id,name,image, bio
    }, 
    reads,
    description, 
    category, 
    image,
}`);

export const PLAYLIST_BY_SLUG_QUERY =
    defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    reads,
    description,
    category,
    image,
    pitch
  }
}`);