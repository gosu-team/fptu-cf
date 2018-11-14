export const config = {
    apis: {
        base_url: "https://fptucf-api.gosu.team",
        mocogateway_base_url: "",
    },
    meta: {
        name: "Confession App",
        short_name: "fptucfs.app",
        fb_tagname: "cfapp",
    },
    assets: {
        server_url: "",
        public_folder: process.env.PUBLIC_URL,
    },
    social: {
        facebook: {
            page: "https://www.facebook.com/gosu.team",
        },
        instagram: {
            page: "https://www.instagram.com/gosu.team",
        },
    },
    facebook_app: {
        enabled: false,
        app_id: "1524500647849245",
    },
};