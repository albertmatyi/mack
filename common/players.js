PlayersCollection = new Meteor.Collection('players');
MonstersCollection = new Meteor.Collection('monsters');

if (Meteor.isServer) {
	MonstersCollection.remove({});
	MonstersCollection.insert({
		_id: 'chiaggo',
		name: 'Chiaggo',
		image: '/monsters/chiaggo.jpg'
	});
	MonstersCollection.insert({
		_id: 'dysotron',
		name: 'Dysotron',
		image: '/monsters/dysotron.jpg'
	});
	MonstersCollection.insert({
		_id: 'elscorpio',
		name: 'Elscorpio',
		image: '/monsters/elscorpio.jpg'
	});
	MonstersCollection.insert({
		_id: 'gineka',
		name: 'Gineka',
		image: '/monsters/gineka.jpg'
	});
	MonstersCollection.insert({
		_id: 'goldenrod',
		name: 'Goldenrod',
		image: '/monsters/goldenrod.jpg'
	});
	MonstersCollection.insert({
		_id: 'oneeye',
		name: 'Oneeye',
		image: '/monsters/oneeye.jpg'
	});
	MonstersCollection.insert({
		_id: 'polinator',
		name: 'Polinator',
		image: '/monsters/polinator.jpg'
	});
	MonstersCollection.insert({
		_id: 'stench',
		name: 'Stench',
		image: '/monsters/stench.jpg'
	});
	MonstersCollection.insert({
		_id: 'thresher',
		name: 'Thresher',
		image: '/monsters/thresher.jpg'
	});

	PlayersCollection.remove({});
	PlayersCollection.insert({
		_id: 'black',
		name: 'Zack',
		image: '/rangers/black-zack.jpg'
	});
	PlayersCollection.insert({
		_id: 'blue',
		name: 'Billy',
		image: '/rangers/blue-billy.jpg'
	});
	PlayersCollection.insert({
		_id: 'green',
		name: 'Tommy',
		image: '/rangers/green-tommy.jpg'
	});
	PlayersCollection.insert({
		_id: 'pink',
		name: 'Kat',
		image: '/rangers/pink-kat.jpg'
	});
	PlayersCollection.insert({
		_id: 'red',
		name: 'Jason',
		image: '/rangers/red-jason.jpg'
	});
	PlayersCollection.insert({
		_id: 'yellow',
		name: 'Trini',
		image: '/rangers/yellow-trini.jpg'
	});
	var range = 0.0002;
	PlayersCollection.find().forEach(function(player) {
		PlayersCollection.update(player._id, {
			$set: {
				'coords.longitude': 11.5968006 + Math.random() * range - range / 2,
				'coords.latitude': 48.152337599999996 + Math.random() * range - range / 2
			}
		});
	});
	Meteor.startup(function() {
		Meteor.call('placeMonsters');
	});
}																																																