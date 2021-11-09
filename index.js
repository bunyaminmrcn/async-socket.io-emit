class AsyncSock {
    /**
     * 
     * @param {any} sock 
     */
    constructor(sock) {
        this.sock = sock;
    }
    /**
     * 
     * @param {string} topic 
     * @param {object} payload 
     * @param {function} callback 
     * @returns {Promise}
     */
    emit = async (topic, payload, callback) => {
        const promiseReturn = await new Promise(async (resolve, reject) => {
            this.sock.emit(topic, payload, (data_) => {
                resolve(data_)
            })
            this.sock.on('error', err => reject(err))
        })

        if(callback) {
            try {
                await callback(promiseReturn)
            } catch (error) {
                return Promise.reject()
            }
        } else {
            return promiseReturn;
        }
    }
}

module.exports = AsyncSock;