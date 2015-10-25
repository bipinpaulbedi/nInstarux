var Schemas = {};
Events = new Mongo.Collection("Events");
Clients = new Mongo.Collection("Clients");
Questions = new Mongo.Collection("Questions");
Answers = new Mongo.Collection("Answers");
Polls = new Mongo.Collection("Polls");
PollReplies = new Mongo.Collection("PollReplies");

Schemas.Events = new SimpleSchema({
  title : {
    type: String,
    label: "Title",
    max: 50,
    min: 1
  },
  description : {
    type: String,
    label: "Description",
    max: 50,
    min: 1
  },
  code: {
    type: Number,
    label: "CODE",
    max: 9999,
    min: 1,
    index: true,
    unique: true,
    denyUpdate: true,
    autoValue: function(){
      if(this.isInsert){ return 1111 + AtomicCounter.increment('EventCode'); } 
      else if(this.isUpsert){ return { $setOnInsert: 1111 + AtomicCounter.increment('EventCode') }; } 
      else { this.unset(); }
    }
  },
  moderatorID: {
    type: String,
    min: 1
  }
});
Schemas.Clients = new SimpleSchema({
  eventID: {
    type: String,
    min: 1
  },
  clientID: {
    type: String,
    min: 1
  }
});
Schemas.Questions = new SimpleSchema({
  eventID: {
    type: String,
    min: 1,
    denyUpdate: true
  },
  question: {
    type: String,
    label: 'Question',
    min: 1,
    max: 140
  },
  enableReply: {
    type: Boolean,
    label: 'Permit Replies',
    defaultValue: false
  },
  isApproved: {
    type: Boolean,
    label: 'Approved',
    defaultValue: false
  },
  votes: {
    type: [String],
    optional: true,
    autoValue: function(){
      if(this.isInsert){ 
        var defaultVote = [];
        defaultVote.push(this.userId);
        return defaultVote; } 
        else if(this.isUpsert){ return { $setOnInsert: function(){
          var defaultVote = [];
          defaultVote.push(this.userId);
          return defaultVote; } 
        }}
      }
    },
    sequence: {
      type: Number,
      label: "SEQUENCE",
      max: 9999,
      min: 1,
      index: true,
      unique: true,
      denyUpdate: true,
      autoValue: function(){
        if(this.isInsert){ return AtomicCounter.increment('qpsequence'); } 
        else if(this.isUpsert){ return { $setOnInsert: AtomicCounter.increment('qpsequence') }; } 
        else { this.unset(); }
      }
    },
    votesCount: {
      type: Number,
      optional: true
      },
    type: {
      type: String,
      optional:true,
      autoValue: function() {return 'Question';}
    }  
    });
Schemas.Answers = new SimpleSchema({
  eventID: {
    type: String,
    min: 1
  },
  questionID: {
    type: String,
    min: 1
  },
  clientID: {
    type: String,
    min: 1
  },
  reply: {
    type: String,
    label: 'Answer',
    min: 1,
    max: 140
  }
});
Schemas.Polls = new SimpleSchema({
  eventID: {
    type: String,
    min: 1,
    denyUpdate: true
  },
  question: {
    type: String,
    label: 'Question',
    min: 1,
    max: 140
  },
  isApproved: {
    type: Boolean,
    label: 'Approved',
    defaultValue: false
  },
  firstChoice: {
    type: String,
    label: 'Choice 1',
    max: 50
  },
  secondChoice: {
    type: String,
    label: 'Choice 2',
    max: 50
  },
  thirdChoice: {
    type: String,
    label: 'Choice 3',
    max: 50
  },
  forthChoice: {
    type: String,
    label: 'Choice 4',
    max: 50
  },
  sequence: {
    type: Number,
    label: "SEQUENCE",
    max: 9999,
    min: 1,
    index: true,
    unique: true,
    denyUpdate: true,
    autoValue: function(){
      if(this.isInsert){ return AtomicCounter.increment('qpsequence'); } 
      else if(this.isUpsert){ return { $setOnInsert: AtomicCounter.increment('qpsequence') }; } 
      else { this.unset(); }
    }
  },
  totalChoiceOne: {
    type: Number,
    optional: true,
    defaultValue: 0
  },

  totalChoiceTwo: {
    type: Number,
    optional: true,
    defaultValue: 0
  },

  totalChoiceThree: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  totalChoiceFour: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  lastComputedDate: {
    type: Date,
    optional: true
  },
  type: {
    type: String,
    optional:true,
    autoValue: function() {return 'Polls';}
  }  
});
Schemas.PollReplies = new SimpleSchema({
  eventID: {
    type: String,
    min: 1
  },
  pollID: {
    type: String,
    min: 1
  },
  clientID: {
    type: String,
    min: 1
  },
  reply: {
    type: Number,
    min: 1,
    max: 4
  }
});

Events.attachSchema(Schemas.Events);
Clients.attachSchema(Schemas.Clients);
Questions.attachSchema(Schemas.Questions);
Answers.attachSchema(Schemas.Answers);
Polls.attachSchema(Schemas.Polls);
PollReplies.attachSchema(Schemas.PollReplies);
