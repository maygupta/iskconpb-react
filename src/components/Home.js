import React from 'react';

import {
  View,
  Text,
  ScrollView,
  ListView,
  Image,
  StyleSheet,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

class Home extends React.Component {
 //  state = {
 //    data : []
 //  };

 //  onAfterLoad = (data) => {
 //    this.setState({
 //      data: data
 //    });
 // };

 //  componentWillMount() { 
 //    let url = 'https://footsteps.herokuapp.com/darshans';
 //    fetch(url)
 //      .then(function(r) {
 //          return r.json();
 //      })
 //      .then(this.onAfterLoad) // Success callback registration
 //      .catch(function(e) {    // Failure callback registartion
 //          alert('Failure fetching data');
 //      });
 //  }

 //  buildImages(data) { 
 //    if(!data) {
 //      return;
 //    }
 //    let images  = [];
 //    alert(this.state.data)

 //    for (let i = 0; i < data.length; i++) {
 //      let item = data[i];

 //      // For when we actually have data
 //      if (item) {
 //          images.push(
 //            <Image source={item.url}
 //              key={'img' + i}
 //            />
 //            )
 //      }

 //    }
 //    return images;
 //  }

  

 //  render() {
 //    let state = this.state,
 //        data = state.data,
 //        images = this.buildImages(data);
 //    this.state.data = [];

 //    return (
 //          <ListView tabLabel='Darshans' 
 //            dataSource={this.state.data}
 //            renderRow={this.renderRow.bind(this)}/>
 //    );
 //  }

    constructor (props) {
      super(props)
      this.dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
      this.state = {isLoading: true, jsonData: '', announcements: ''};
    }

    componentDidMount () {
      // You don't need to assign the return value to the state
      this.getMoviesFromApiAsync()
      this.getAnnouncements()
    }

    getMoviesFromApiAsync() {
      return fetch('https://footsteps.herokuapp.com/darshans')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({isLoading: false, jsonData: responseJson});
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getAnnouncements() {
      return fetch('https://footsteps.herokuapp.com/announcements')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({isLoading: false, announcements: responseJson});
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }


    render () {
      // Use the dataSource
      const rows = this.dataSource.cloneWithRows(this.state.jsonData || [])
      const announcements = this.dataSource.cloneWithRows(this.state.announcements || [])

      return (
        <ScrollableTabView style={{marginTop: 62}}>
            <ListView
              dataSource={rows}
              renderRow={this.renderRow.bind(this)}
              tabLabel='Darshans'
            />
            <ListView
              dataSource={announcements}
              renderRow={this.renderRowAnn.bind(this)}
              tabLabel='Announcements'
            />
          </ScrollableTabView>
        
      )
    }

    renderRowAnn(rowData) {
      return(
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
          <Image 
          style={{
            width: 50, height: 50,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            display: 'inline-block'
          }}
          source={{uri: rowData.url}}
          />
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <Text
              style={{
                marginBottom: 10,
                marginRight: 10,
                fontSize: 12
              }}
            >{rowData.message}</Text>
            <Text
              style={{
                fontSize: 14,
                color: '#01014f',
                fontWeight: 'bold',
              }}
            >{rowData.date}</Text>
          </View>
        </View>
      )
    }

    renderRow(rowData) {
      // alert(rowData.url)
      return(
        <View>
          <Image 
          style={{
            width: 380, height: 220,
            marginBottom: 10
          }}
          source={{uri: rowData.url}}
          />
          <Text
            style={{
              marginBottom: 10,
              textAlign: 'center'
            }}
          >{rowData.description}</Text>
        </View>
      )
    }


}


export default Home;