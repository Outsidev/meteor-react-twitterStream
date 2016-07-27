import {Mongo} from 'meteor/mongo';

export const TwitDb = new Mongo.Collection('twitdb');

Meteor.methods({
  'TwitDb.add'(twit){
    let maxCount = 11
    if(TwitDb.find().count()>=maxCount){
      console.log("DEL");
      let ids = TwitDb.find({},{limit:1}).fetch();
      TwitDb.remove({_id: ids[0]._id });
    }
    TwitDb.insert(twit);
  },
  'TwitDb.clear'(){
    TwitDb.remove({});
  }
});
