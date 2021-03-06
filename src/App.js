import React from 'react';
import {Grid} from '@material-ui/core';
import youtube from "./api/youtube";
import {SearchBar,VideoDetail,VideoList} from "./components";
// import VideoList from "./components/VideoList";




class App extends React.Component{

    state={
        videos: [],
        selectedVideo :null,
    }

    componentDidMount(){
        this.handleSubmit('Gypsy Traveller Buran Ghati')
    }

    onVideoSelect =(video)=>{
        this.setState({selectedVideo:video})

    }

    handleSubmit = async (searchTerm) =>{
        const response = await youtube.get('search',{ 
            params:{
                part:'snippet',
                maxResults :5,
                key: 'AIzaSyB5Yl0S7VfkU5qJjApv_gXKilgnlg3UhaE',
                q: searchTerm,
            }
        });
    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
    }



    render(){
        const {selectedVideo ,videos} = this.state;
        return(
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10} >
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                           {/* \ /Search bar */}
                           <SearchBar onFormSubmit={this.handleSubmit} />

                        </Grid>
                        <Grid item xs={8}>
                            {/* /Video Details */}
                        <VideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                         {/* Video List */}
                         <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />

                        </Grid>

                    </Grid>

                </Grid>

            </Grid>
        )
    }
}

export default App;
