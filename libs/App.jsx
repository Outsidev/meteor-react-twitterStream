import React from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import TweetKutulari from '../libs/TweetKutulari.jsx';

import {TwitDb} from '../libs/publicScripts';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      tweetler:[]
    };
  }

  tweetleriCagir(aranan)
  {
    Meteor.call('searchTweets',aranan,(err,tweetler)=>{
      if(err)
        console.log("TWITTLERE ERISILEMIYOR.peh...");
      else
        this.setState({tweetler:tweetler.statuses});
    });
  }

  render(){
    return(
      <div className="container">
          <TestInputs twetAra = {this.tweetleriCagir.bind(this)}/>
          <TweetKutulari tweetler={this.props.twitlerdb}/>
      </div>
    );
  }
}

export default createContainer(()=>{
  Meteor.subscribe('daDB');
  return{
    twitlerdb:TwitDb.find({},{sort:{created_at:-1}}).fetch()
  };
},App);

///////
class TestInputs extends React.Component {
  constructor(){
    super();
  }

  twetAraInput(event){
    if(event.charCode==13 || event.type == "click")
    {
      const aranan = ReactDOM.findDOMNode(this.refs.textAlani).value;
      this.props.twetAra(aranan);
    }
  }

  twetStream(){
    console.log("LOOK STREAMMM");
    const aranan = ReactDOM.findDOMNode(this.refs.textAlani).value;
    Meteor.call('doStream',aranan);
  }

  stopStream(){
    console.log("STOP FUCKER");
    Meteor.call('stopStream');
  }

  clearDB(){
    console.log("DB OGNE!");
    Meteor.call('TwitDb.clear');
  }

  render(){
    return(
      <div className="row input-alani">
        <div className="row col-md-4">
          <input className="form-control " ref="textAlani" type="text" placeholder="To beyond and eternity!..."
            onKeyPress={this.twetAraInput.bind(this)}></input>
        </div>
        <div className="row col-md-4">
          <button className="btn btn-info" onClick={()=>{console.log("NOPE,for now...");}}>
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
          <button className="btn btn-warning" onClick={this.twetStream.bind(this)}>
            <span className="glyphicon glyphicon-piggy-bank" aria-hidden="true"></span>
          </button>
          <button className="btn btn-warning" onClick={this.stopStream.bind(this)}>
            <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
          </button>
          <button className="btn btn-danger" onClick={this.clearDB.bind(this)}>
            <span className="glyphicon glyphicon-eject" aria-hidden="true"></span>
          </button>
        </div>
    </div>

    );
  }
}
