// 옛 주소 cubefreight.pages.dev로 들어온 요청을 같은 경로 그대로 https://freight.yoana.me 로 영구 이동(301).
// 미리보기 배포(해시.cubefreight.pages.dev)와 새 주소 자체는 그대로 통과.
const OLD_HOST = 'cubefreight.pages.dev';
const NEW_ORIGIN = 'https://freight.yoana.me';

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === OLD_HOST) {
    return Response.redirect(NEW_ORIGIN + url.pathname + url.search, 301);
  }
  return next();
}
