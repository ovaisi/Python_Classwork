export default ({ env }) => ({
  // Upload — local disk storage on VPS
  upload: {
    config: {
      provider:       'local',
      providerOptions: {
        sizeLimit: 10 * 1024 * 1024, // 10 MB
      },
      actionOptions: {
        upload:       {},
        uploadStream: {},
        delete:       {},
      },
    },
  },
});
