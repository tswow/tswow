
export type ADTBounds = [
  minX: number, minY: number, maxX: number, maxY: number
]

export function setMinimapCoords(
      map: ADTBounds
    , minX: number
    , minY: number
    , maxX: number
    , maxY: number
) {
  const [adtMinX,adtMinY,adtMaxX,adtMaxY] = map;

  let worldLeft   = (32-adtMinX) * 533.333333333;
  let worldTop    = (32-adtMinY) * 533.333333333;
  let worldRight  = (31-adtMaxX) * 533.333333333;
  let worldBot    = (31-adtMaxY) * 533.333333333;

  let worldSizeX = worldLeft-worldRight;
  let worldSizeY = worldTop-worldBot;

  let minimapSizeX = (adtMaxX-adtMinX+1)*256;
  let minimapSizeY = (adtMaxY-adtMinY+1)*256;

  // Note that, "minimum" points here will be LARGER than the maximum

  let worldMinX = worldLeft-(minX/minimapSizeX)*worldSizeX;
  let worldMinY = worldTop-(minY/minimapSizeY)*worldSizeY;

  let worldMaxX = worldLeft-(maxX/minimapSizeX)*worldSizeX;
  let worldMaxY = worldTop-(maxY/minimapSizeY)*worldSizeY;

  return {worldMinX,worldMinY,worldMaxX,worldMaxY};
}