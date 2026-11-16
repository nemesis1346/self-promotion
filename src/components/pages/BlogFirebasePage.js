import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getBlogs } from "../../actions/blogMediumActions";
import BlogCard from '../cards/BlogCard';
import ContentListPage from '../layout/ContentListPage';
import { useLang } from '../../content/LangContext';

// Blog posts come from Medium (through rss2json).
function BlogFirebasePage({ posts, error, loading, getBlogs }) {
  const { t } = useLang();
  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <ContentListPage
      title={t.pages.blogTitle}
      subtitle={t.pages.blogSub}
      items={posts}
      loading={loading}
      error={error}
      renderItem={(p, i) => <BlogCard key={p.guid || p.link || i} post={p} />}
    />
  );
}

const mapStateToProps = state => ({
  posts: state.blogPageReducer.posts,
  error: state.blogPageReducer.error,
  loading: state.blogPageReducer.loading,
});

export default connect(mapStateToProps, { getBlogs })(BlogFirebasePage);
