const helloService = async () => {
    try {
        return 'Hello';
    } catch {
        err => console.log(err);
    }
};

module.exports = { helloService };
