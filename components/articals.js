import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/image.png';
import bbcLogo from '../assets/bbc.png';
import TrendingNews from './TrendingNews';
import googleNewsLogo from '../assets/googleNewsLogo.jpeg';
import foxBusinessLogo from '../assets/foxBusinessLogo.png';
import washingtonPostLogo from '../assets/washingtonPostLogo.png';
import reutersLogo from '../assets/reutersLogo.png';
import placeholderImage from '../assets/placeholder.png';
import wired from '../assets/wired.jpg';

const categories = ['All', 'Sports', 'Politics', 'Travel', 'Education', 'Food', 'Business', 'Health', 'Science'];

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const categorizeArticles = (articles) => {
    return articles.map(article => {
      let category = 'General';
      const { title, description } = article;

      if (title || description) {
        const content = `${title} ${description}`.toLowerCase();

        if (content.includes('sport') || content.includes('soccer') || content.includes('football') || content.includes('basketball')) {
          category = 'Sports';
        } else if (content.includes('politic') || content.includes('government') || content.includes('election')) {
          category = 'Politics';
        } else if (content.includes('travel') || content.includes('tourism') || content.includes('vacation')) {
          category = 'Travel';
        } else if (content.includes('education') || content.includes('school') || content.includes('university')) {
          category = 'Education';
        } else if (content.includes('food') || content.includes('recipe') || content.includes('cuisine')) {
          category = 'Food';
        } else if (content.includes('business') || content.includes('finance') || content.includes('economy')) {
          category = 'Business';
        } else if (content.includes('health') || content.includes('medicine') || content.includes('wellness')) {
          category = 'Health';
        } else if (content.includes('science') || content.includes('technology') || content.includes('research')) {
          category = 'Science';
        }
      }

      return { ...article, category };
    });
  };

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything?q=latest&apiKey=9e10bd4b04014eb29f53ebb30e12d196');
        const categorizedArticles = categorizeArticles(response.data.articles);
        console.log('Categorized Articles:', categorizedArticles);
        setArticles(categorizedArticles);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', (event) => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', (event) => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const renderArticle = ({ item }) => (
    <TouchableOpacity
      style={styles.articleContainer}
      onPress={() => navigation.navigate('ArticleDetail', { article: item })}
    >
      <Image
        source={item.urlToImage ? { uri: item.urlToImage } : placeholderImage}
        style={styles.articleImage}
        onError={(error) => {
          console.error(`Error loading image: ${error.nativeEvent.error}`);
        }}
      />
      <View style={styles.articleContent}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.articleFooter}>
          {item.source.name === 'BBC News' && (
            <View style={styles.sourceContainer}>
              <Image source={bbcLogo} style={styles.bbcIcon} />
              <Text style={styles.source}>{item.source.name}</Text>
            </View>
          )}
          {item.source.name === 'Google News' && (
            <View style={styles.sourceContainer}>
              <Image source={googleNewsLogo} style={styles.googleNewsIcon} />
              <Text style={styles.source}>{item.source.name}</Text>
            </View>
          )}
          {item.source.name === 'Fox Business' && (
            <View style={styles.sourceContainer}>
              <Image source={foxBusinessLogo} style={styles.foxBusinessIcon} />
              <Text style={styles.source}>{item.source.name}</Text>
            </View>
          )}
          {item.source.name === 'The Washington Post' && (
            <View style={styles.sourceContainer}>
              <Image source={washingtonPostLogo} style={styles.washingtonPostIcon} />
              <Text style={styles.source}>{item.source.name}</Text>
            </View>
          )}
          {item.source.name === 'Reuters' && (
            <View style={styles.sourceContainer}>
              <Image source={reutersLogo} style={styles.reutersIcon} />
              <Text style={styles.source}>{item.source.name}</Text>
            </View>
          )}
          {item.source.name === '' && (
            <View style={styles.sourceContainer}>
              <Image source={wired} style={styles.reutersIcon} />
              <Text style={styles.source}>{item.source.name}</Text>
            </View>
          )}
          {item.source.name !== 'BBC News' && item.source.name !== 'Google News' && item.source.name !== 'Fox Business' && item.source.name !== 'The Washington Post' && item.source.name !== 'Reuters' && (
            <Text style={styles.source}>{item.source.name}</Text>
          )}
          <Text style={styles.time}>{new Date(item.publishedAt).toLocaleTimeString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching articles: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Image source={logo} style={styles.logoImage} />
              <Icon name="notifications-outline" size={24} color="black" />
            </View>
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="grey" />
              <TextInput placeholder="Search" style={styles.searchInput} />
            </View>
            <TrendingNews />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScrollContainer}
              keyboardDismissMode="on-drag"
            >
              {categories.map(category => (
                <Text
                  key={category}
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  {category}
                </Text>
              ))}
            </ScrollView>
            <View style={styles.contentContainer}>
  <Text style={styles.latestText}>Latest</Text>
  <FlatList
    data={filteredArticles}
    renderItem={renderArticle}
    keyExtractor={(item, index) => `${item.url}-${index}`}
    contentContainerStyle={styles.flatListContentContainer}
    extraData={filteredArticles} // Add extraData prop
    showsVerticalScrollIndicator={false}
  />
</View>

            <Animated.View style={[styles.bottomNavigation, { bottom: keyboardHeight }]}>
              <Icon name="home" size={24} color="blue" />
              <Icon name="search" size={24} color="grey" />
              <Icon name="bookmark-outline" size={24} color="grey" />
              <Icon
                name="person-outline"
                size={24}
                color="grey"
                onPress={() => navigation.navigate('Profile')}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logoImage: {
    width: 100,
    height: 80,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  contentContainer: {
    flex: 1, // Ensure the container fills the available space
    marginTop:-350,
  },
  categoryScrollContainer: {
    paddingVertical: 10, // Keep top padding
    paddingHorizontal: 8,
    paddingBottom: 10, // Add bottom padding
    marginTop:20,
},

  categoryText: {
    marginHorizontal: 8,
    fontSize: 18,
    color: 'grey',
    marginTop: -10,
  },
  selectedCategoryText: {
    color: 'black',
    fontWeight: 'bold',
  },
  latestText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 10,
    marginTop:20,
  },
  flatListContentContainer: {
    paddingHorizontal: 16,
  },
  articleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
   // overflow: 'hidden',
   // elevation: 1,
  },
  articleImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  articleContent: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  source: {
    fontSize: 12,
    color: 'grey',
  },
  time: {
    fontSize: 12,
    color: 'grey',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bbcIcon: {
    width: 18,
    height: 18,
  },
  googleNewsIcon: {
    width: 18,
    height: 18,
  },
  foxBusinessIcon: {
    width: 18,
    height: 18,
  },
  washingtonPostIcon: {
    width: 18,
    height: 18,
  },
  reutersIcon: {
    width: 18,
    height: 18,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomNavigation: {
    position: 'relative',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
});

export default Articles;
