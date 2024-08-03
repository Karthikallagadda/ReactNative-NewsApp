import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import googleNewsLogo from '../assets/googleNewsLogo.jpeg';
import foxBusinessLogo from '../assets/foxBusinessLogo.png';
import washingtonPostLogo from '../assets/washingtonPostLogo.png';
import bbcLogo from '../assets/bbc.png';
import placeholderImage from '../assets/placeholder.png';

const screenWidth = Dimensions.get('window').width;

const TrendingNews = ({ navigation }) => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=9e10bd4b04014eb29f53ebb30e12d196');
        const articles = response.data.articles.filter(article => article.urlToImage); // Filter out articles with null images
        setTrendingNews(articles);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTrendingNews();
  }, []);

  const renderTrendingItem = ({ item }) => (
    <View style={styles.trendingItem}>
      <Image
        source={{ uri: item.urlToImage || placeholderImage }}
        style={styles.trendingImage}
        onError={() => {
          item.urlToImage = placeholderImage;
          // Force a re-render to display the placeholder image
          setTrendingNews([...trendingNews]);
        }}
      />
      <View style={styles.overlay}>
        <Text style={styles.trendingTitle}>{item.title}</Text>
        <View style={styles.trendingFooter}>
          {item.source.name === 'BBC News' && (
            <View style={styles.sourceContainer}>
              <Image source={bbcLogo} style={styles.sourceIcon} />
              <Text style={styles.source}>{item.source.name}</Text>
            </View>
          )}
          {item.source.name === 'Google News' && (
            <View style={styles.sourceContainer}>
              <Image source={googleNewsLogo} style={styles.sourceIcon} />
              <Text style={styles.source}>{item.source.name}</Text>
            </View>
          )}
          {item.source.name === 'Fox Business' && (
            <View style={styles.sourceContainer}>
              <Image source={foxBusinessLogo} style={styles.sourceIcon} />
              <Text style={styles.source}>{item.source.name}</Text>
            </View>
          )}
          {item.source.name === 'The Washington Post' && (
            <View style={styles.sourceContainer}>
              <Image source={washingtonPostLogo} style={styles.sourceIcon} />
              <Text style={styles.source}>{item.source.name}</Text>
            </View>
          )}
          {item.source.name !== 'BBC News' &&
            item.source.name !== 'Google News' &&
            item.source.name !== 'Fox Business' &&
            item.source.name !== 'The Washington Post' && (
              <Text style={styles.source}>{item.source.name}</Text>
            )}
          <Text style={styles.time}>{new Date(item.publishedAt).toLocaleTimeString()}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching trending news: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Trending News</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllTrendingNews')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={trendingNews}
        renderItem={renderTrendingItem}
        keyExtractor={item => item.url}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trendingList}
        pagingEnabled // Enable paging to snap to each item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: -6,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  seeAll: {
    fontSize: 16,
    color: 'gray',
  },
  trendingList: {
    paddingVertical: 8,
  },
  trendingItem: {
    width: screenWidth - 32,
    height: 250,
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  trendingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  source: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
  time: {
    fontSize: 14,
    color: '#fff',
  },
  sourceIcon: {
    width: 20,
    height: 20,
  },
});

export default TrendingNews;
