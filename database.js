const mongoose = require('mongoose');

class Database {

    constructor(){
        this.connect()
    }

	connect() {
		mongoose
			.connect(
				'mongodb+srv://Ahmed:ahmed123@cluster0.txq89.mongodb.net/Twitter?retryWrites=true&w=majority',
				{
					useNewUrlParser: true,
					useCreateIndex: true,
					useUnifiedTopology: true,
                    useFindAndModify: false
				}
			)
			.then(() => {
				console.log(`You are connected to DB`.cyan.bold);
			})
			.catch((err) =>
				console.log(`Database Error: ${err}`.bgGreen.black)
			);
	}
}


module.exports = new Database();