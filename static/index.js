let { Router, Route, Link, browserHistory } = window.ReactRouter;

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeTitle: 'Eclass',
            homeUrl: '/web/eclass'
        }
    }

    render() {
        let { homeTitle, homeUrl } = this.state;
        return (
            <nav className="navbar navbar-default navbar-static-top" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand" href={ homeUrl }>{ homeTitle }</a>
                </div>
            </nav>
        )
    }
}

class EmptyEclassMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div><p>Eclass will show up here, make one!</p></div>
        )
    }
}

class EclassCollectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            eclassCollection: []
        };
    }

    getEclassCollection() {
        fetch('/api/v1/eclass')
            .then( (response) => {
                return response.json()
            })
            .then( (json) => {
                var arr = JSON.parse(json)
                this.setState({ eclassCollection: arr })
            })
    }

    componentWillMount() {
        this.getEclassCollection()
    }

    render() {
        let { eclassCollection } = this.state;

        if (eclassCollection === 0) {
            return (
                <div>
                    <TopBar></TopBar>
                    <div><p>Eclass will show up here, make one!</p></div>
                </div>
            )
        }

        return (
            <div>
                <TopBar></TopBar>
                <div>
                    {eclassCollection.map(eclass =>
                        <li key={eclass.id}><Link to={ "/web/eclass/" + eclass.id }>{eclass.name}</Link></li>
                    )}
                </div>
            </div>
        )
    }
}

class EclassInformationComponent extends React.Component {

    constructor(props) {
        super(props);
        this.props.params.id = props.params.id
        this.state = {
            eclass: []
        }
    }

    getEclassInformation(id) {
        fetch('/api/v1/eclass/' + id)
            .then( (response) => {
                return response.json()
            })
            .then( (json) => {
                let eclass = JSON.parse(json)
                this.setState({eclass: eclass})
            })
    }

    componentWillMount() {
        this.getEclassInformation(this.props.params.id)
    }

    render() {
        let { eclass } = this.state;

        let eclassList = null;
        if (eclass.length === 0) {
            eclassList = <EmptyEclassMessage />;
        } else {
            eclassList = (
                <div>
                    {eclass.map(info =>
                        <li key={info.id}><Link to={ "/web/eclass/" + info.id }>{info.name}</Link></li>
                    )}
                </div>
            )
        }

        return eclassList;
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/web/eclass/' component={EclassCollectionComponent}>
      </Route>
      <Route path='/web/eclass/:id' component={EclassInformationComponent}>
      </Route>
    </Router>
), document.getElementById('root'));
