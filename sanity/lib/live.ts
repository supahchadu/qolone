import "server-only"
import { client } from '@/sanity/lib/client';
import { defineLive } from "next-sanity/live";

export const { sanityFetch, SanityLive } = defineLive({ client })