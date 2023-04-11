// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

// Load the compressed GPX file into memory when the application starts
const gpxFilePath = path.join(process.cwd(), 'datasource', 'aim.geocaches.gpx.gz');
const gpxData = fs.readFileSync(gpxFilePath);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
) {
  // Set the response headers to indicate that the response is a compressed GPX file
  res.setHeader('Content-Type', 'application/gpx+xml');
  res.setHeader('Content-Encoding', 'gzip');
  res.setHeader('Content-Disposition', 'attachment; filename="aim.geocaches.gpx"');

  // Send the compressed GPX data as the response
  res.send(gpxData);
}
