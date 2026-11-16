import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProjectsByDatetime } from "../../actions/softwareProjectFirebaseActions";
import ProjectCard from '../cards/ProjectCard';
import ContentListPage from '../layout/ContentListPage';
import { useLang } from '../../content/LangContext';

function SoftwareProjectsPage({ projects, error, loading, getProjectsByDatetime }) {
  const { t } = useLang();
  useEffect(() => {
    getProjectsByDatetime();
  }, [getProjectsByDatetime]);

  return (
    <ContentListPage
      title={t.pages.projectsTitle}
      subtitle={t.pages.projectsSub}
      items={projects}
      loading={loading}
      error={error}
      renderItem={(p, i) => <ProjectCard key={p.id || i} project={p} />}
    />
  );
}

const mapStateToProps = state => ({
  projects: state.softwareProjectsPageReducer.projects,
  error: state.softwareProjectsPageReducer.error,
  loading: state.softwareProjectsPageReducer.loading,
});

export default connect(mapStateToProps, { getProjectsByDatetime })(SoftwareProjectsPage);
