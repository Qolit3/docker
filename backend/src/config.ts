
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  YANDEX_CLIENT_ID: "0f5afb023fd64c3bbbf1da8e840b8e95",
  YANDEX_CLIENT_SECRET: "3325fdcdbf734c9daf5c5124eb8041b2",
  YANDEX_REDIRECT_URI: "https://1420ecb7-13ed-4535-8470-d747bfe548a4.serverhub.praktikum-services.ru/oauth/callback"
});
