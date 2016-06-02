'use strict';

import React from 'react'
import {Alert, Button} from 'react-bootstrap'
import shared from '../SharedConsts'

/*var data = [
    {
   "datasource": "github",
   "eventType": "push",
   "apiToken": "3a44a3cd-66e6-4dd1-83e0-f6bde38fc08e",
   "tenantId": 1056454051,
   "token": "37b9d70f87fcf9b388b629d2888358ef5bbb5394",
   "hookUrl": "https://webhook.boris.gaiahub.io/wh/3a44a3cd-66e6-4dd1-83e0-f6bde38fc08e/37b9d70f87fcf9b388b629d2888358ef5bbb5394",
   "tsField": "repository.pushed_at"
   },
   {
   "datasource": "dockerhub",
   "eventType": "push",
   "tsField": "push_data.pushed_at",
   "createdAt": 1463989059120,
   "apiToken": "3a44a3cd-66e6-4dd1-83e0-f6bde38fc08e",
   "tenantId": 1056454051,
   "token": "69e9428cf392271051a8a528d686c97dd5aad5d1",
   "hookUrl": "https://webhook.webhook.boris.gaiahub.io/wh/3a44a3cd-66e6-4dd1-83e0-f6bde38fc08e/69e9428cf392271051a8a528d686c97dd5aad5d1"
   },
   {
   "datasource": "trello",
   "eventType": "management",
   "createdAt": 1463672199301,
   "apiToken": "3a44a3cd-66e6-4dd1-83e0-f6bde38fc08e",
   "tenantId": 1056454051,
   "token": "811aeeb408b29857edb349865f71b5a7c153ffad",
   "hookUrl": "https://webhook.webhook.boris.gaiahub.io/wh/3a44a3cd-66e6-4dd1-83e0-f6bde38fc08e/811aeeb408b29857edb349865f71b5a7c153ffad"
   }
];*/

var WebhookBox = React.createClass({

  propTypes: {
    data: React.PropTypes.array,
    errorMessage: React.PropTypes.string,
    alertVisible: React.PropTypes.bool
  },

  getInitialState() {
    console.log('initialization');
    return {
      data: [],
      alertVisible: false,
      errorMessage: ''
    }
  },

  componentDidMount() {
    console.log('mounted');
    $.ajax({
      type: 'GET',
      url: '/'+shared.bePath+'/webhooks',
      datatype: 'json',
      cache: false,
      headers: {'Authorization': 'Bearer aaaaaaaaaaaaaaaaaaaaaaaaa'},
      success: function (data) {
        console.log('Body: ' + JSON.stringify(data));
        this.setState({alertVisible: false, data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr.url, status, err.toString());
        this.setState({alertVisible: true, data: [], errorMessage: err.toString()+' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') +')' });
      }.bind(this)
    });
  },
  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },
  render: function () {
    if (this.state.alertVisible) {
      return (
        <div className="tokenBox">
          <h2>Webhooks:</h2>
          <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
            <h4>Error occurred - {this.state.errorMessage}</h4>
            <Button onClick={this.handleAlertDismiss}>Got it!</Button>
          </Alert>
        </div>
      )
    } else {
      return (
        <div className="tokenBox">
          <h2>Webhooks:</h2>
          <WebhookList data={this.state.data}/>
        </div>
      )
    }
  }
});


var WebhookList = React.createClass({

  propTypes: {
    data: React.PropTypes.array
  },

  render: function () {
    var tokens = this.props.data.map(function (t) {
      return (
        <Webhook key={t.token} datasource={t.datasource} event={t.eventType} hookUrl={t.hookUrl} tsField={t.tsField}/>
      );
    });
    return (
      <div className="tokenList">
        {tokens}
      </div>
    );
  }
});

var Webhook = React.createClass({

  propTypes: {
    datasource: React.PropTypes.string,
    event: React.PropTypes.string,
    hookUrl: React.PropTypes.string,
    tsField: React.PropTypes.string
  },

  getInitialState: function () {
    return ({showEditor: false});
  },
  onEditClick: function () {
    {
      this.state.showEditor ? document.getElementById('editWebhook').innerHTML = 'Edit' : document.getElementById('editWebhook').innerHTML = 'Exit Editing';
    }
    this.setState({showEditor: !this.state.showEditor});
  },
  onDeleteClick: function () {
    return (
      alert('Not implemented yet')
    );
  },
  render: function () {
    return (
      <div className="token">
        <b>Datasource:</b> {this.props.datasource}&nbsp;<b>Event:</b> {this.props.event}
        <br/><b>URL:</b> {this.props.hookUrl}<br/>
        { this.state.showEditor ? <WebhookEditor tsField={this.props.tsField}/> : null }
        <button className="btn btn-primary" id="editWebhook" type="button" onClick={this.onEditClick}>Edit</button>
        &nbsp;
        <button className="btn btn-danger" id="deleteWebhook" type="button"
                onClick={this.onDeleteClick}>Delete
        </button>
        &nbsp;
        <p/>
      </div>
    )
  }
});

var WebhookEditor = React.createClass({

  propTypes: {
    tsField: React.PropTypes.string
  },

  getInitialState: function () {
    return {tsField: this.props.tsField, hasChanges: false}
  },
  onChange: function (e) {
    //show save/cancel buttons only if the initial value has changed
    if (this.props.tsField === e.target.value) {
      this.setState({tsField: e.target.value, hasChanges: false})
    } else {
      this.setState({tsField: e.target.value, hasChanges: true})
    }
  },
  onSaveClick: function () {
    return (
      alert('Not implemented yet')
    )
  },
  onCancelClick: function () {
    this.setState({tsField: this.props.tsField, hasChanges: false});
    /*    return (
     alert('Not implemented yet')
     );*/
  },
  render: function () {
    return (
      <div className="tokenEditor">


        <b>Timestamp field: </b> <input type="text" size="50" onChange={this.onChange}
                                        value={this.state.tsField}></input>&nbsp;

        {this.state.hasChanges ?
          <button className="btn btn-sm btn-primary" id="saveWebhook" type="button" onClick={this.onSaveClick}>
            Save </button> : null}&nbsp;
        {this.state.hasChanges ?
          <button className="btn btn-sm btn-warning" id="notSaveWebhook" type="button" onClick={this.onCancelClick}>
            Cancel </button> : null}&nbsp;
        <br/>
      </div>
    )
  }
});


module.exports = WebhookBox;