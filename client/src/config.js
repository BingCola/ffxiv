let HOST = '';
if (process.env.NODE_ENV == 'development') {
    HOST = `/api`;
} else {
    HOST = `/`;
}

const PATH = {
    IMAGE: '/images'
};
export { HOST, PATH };
