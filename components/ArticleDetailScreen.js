import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../assets/image.png';
import placeholderImage from '../assets/placeholder.png'; // Adjust the path according to your project structure

const ArticleDetailScreen = ({ route }) => {
  const { article } = route.params;

  // Adding more coherent content
  const additionalContent = `
    The news article you're reading is an in-depth exploration of current events, providing valuable insights and comprehensive coverage of the subject matter. This content is designed to offer a thorough understanding of the topic, ensuring that readers are well-informed about recent developments.

    With the increasing complexity of global issues, it's crucial to have access to detailed and accurate information. This article aims to address various aspects of the news story, providing context, background, and expert opinions. The goal is to present a balanced view, enabling readers to form their own informed opinions.

    As the situation evolves, the article will be updated to reflect new information and developments. Stay tuned for the latest updates and analyses as they become available. This approach ensures that readers have the most current and relevant information at their fingertips.

    For a deeper understanding, additional resources and references may be included, offering a broader perspective on the topic. This content is curated to meet the highest journalistic standards, ensuring reliability and accuracy in reporting.

    We appreciate your interest in this topic and encourage you to explore further to gain a more comprehensive understanding of the issues at hand.
  `;

  const contentToDisplay = article.content ? article.content + additionalContent : additionalContent;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logoImage} />
        <Icon name="notifications-outline" size={24} color="black" />
      </View>
      <View style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image 
            source={article.urlToImage ? { uri: article.urlToImage } : placeholderImage} 
            style={styles.image} 
          />
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.author}>{article.author ? `By ${article.author}` : 'Author Unknown'}</Text>
          <Text style={styles.publishedAt}>{new Date(article.publishedAt).toLocaleDateString()}</Text>
          <Text style={styles.content}>
            {contentToDisplay}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginTop: 40,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  logoImage: {
    width: 100,
    height: 80,
  },
  scrollViewContent: {
    paddingVertical: 16,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 12,
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 8,
    textAlign: 'center',
  },
  publishedAt: {
    fontSize: 14,
    color: '#adb5bd',
    marginBottom: 16,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#343a40',
    textAlign: 'justify',
  },
});

export default ArticleDetailScreen;
