const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { path } = require('path');

const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 5000;

try {
	const app = express();
	await connectDB();
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => ({ req })
	});
	server.applyMiddleware({ app, path: '/graphql' });
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static('client/build'));
		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
		});
	}
	await app.listen({ port: PORT });
	console.log('🚀 Server ready at ' + server.graphqlPath);
} catch (error) {
	console.log(error);
	process.exit(1);
}