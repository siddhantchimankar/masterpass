const mongoose = require('mongoose');
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MongoUri || mongoUri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log('MongoDB connected...');
	} catch (error) {
		console.log(error.msg);

		// Process exits with a failure
		process.exit(1);
	}
};

module.exports = connectDB;
