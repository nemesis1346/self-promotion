import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getWebDesignProjectsByDatetime } from "../../actions/webDesignProjectFirebaseActions";
import ProjectCard from '../cards/ProjectCard';
import ContentListPage from '../layout/ContentListPage';
import { useLang } from '../../content/LangContext';

function WebDesignProjectsPage({ webDesignProjects, error, loading, getWebDesignProjectsByDatetime }) {
  const { t } = useLang();
  useEffect(() => {
    getWebDesignProjectsByDatetime();
  }, [getWebDesignProjectsByDatetime]);

  return (
    <ContentListPage
      title={t.pages.webDesignTitle}
      subtitle={t.pages.webDesignSub}
      items={webDesignProjects}
      loading={loading}
      error={error}
      renderItem={(p, i) => <ProjectCard key={p.id || i} project={p} />}
    />
  );
}

const mapStateToProps = state => ({
  webDesignProjects: state.webDesignProjectsPageReducer.webDesignProjects,
  error: state.webDesignProjectsPageReducer.error,
  loading: state.webDesignProjectsPageReducer.loading,
});

export default connect(mapStateToProps, { getWebDesignProjectsByDatetime })(WebDesignProjectsPage);
