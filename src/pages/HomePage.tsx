import Activity from '../components/Activity/Activity';

const HomePage: React.FC = () => {

  return (
    <div className="home mt-4">
      <div className="row">
        <div className="col-md-6">
          <Activity cardTitle="In Progress" page={1} pageLimit={5} timeStatus="IN_PROGRESS" />
        </div>
        <div className="col-md-6">
          <Activity cardTitle="Upcoming" page={1} pageLimit={5} timeStatus="RECENT" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <Activity cardTitle="Future" page={1} pageLimit={5} timeStatus="FUTURE" />
        </div>
        <div className="col-md-6">
          <Activity cardTitle="Not Scheduled" page={1} pageLimit={5} timeStatus="NOT_SCHECULED" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <Activity cardTitle="Past" page={1} pageLimit={5} timeStatus="PAST" />
        </div>
        <div className="col-md-6">
          <Activity cardTitle="Suggested" page={1} pageLimit={5} timeStatus="SUGGESTED" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
