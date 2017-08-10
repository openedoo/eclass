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
    render() {
        return (
            <div><p>Eclass will show up here, make one!</p></div>
        )
    }
}

class EclassInList extends React.Component {
    render() {
        return (
            <div>
                <div className="well">
                    <h4>{this.props.eclassName}</h4>
                    <p>{this.props.eclassCourse}</p>
                    <p>{this.props.eclassUniv}</p>
                </div>
            </div>
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

        if (eclassCollection.length === 0) {
            return (
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="well">
                            <p className="text-center">Eclass will show up here, make one!</p>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="row">
                    <ul className="list-unstyled col-md-6 col-md-offset-3">
                        {eclassCollection.map(eclass =>
                            <li key={eclass.id}>
                                <Link to={ "/web/eclass/" + eclass.id }>
                                    <EclassInList
                                        eclassName={eclass.name}
                                        eclassCourse={eclass.course}
                                        eclassUniv={eclass.university} />
                                </Link>
                            </li>
                        )}
                    </ul>
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

class EclassHomepage extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <TopBar/>
                <EclassCollectionComponent wait={1000}/>
            </div>
        )
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/web/eclass/' component={EclassHomepage}>
      </Route>
      <Route path='/web/eclass/:id' component={EclassInformationComponent}>
      </Route>
    </Router>
), document.getElementById('root'));
