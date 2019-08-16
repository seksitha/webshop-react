import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Header from "./app.partials/app.header/header";
import { dispatcher } from './app.utils';
// import NotFound from './app.partials/app.notFound'


import ProductListingContainer from './product.listing/product.listing.controllers/product.listing.container'



class AppRouter extends React.Component {
    login = (val) => {
        this.props.dispatcher('$$mw-POST_LOGIN', val)
    }
    handleload = e => {
        const confirmationMessage = 'hello world';
        e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
        return confirmationMessage;
    }
    componentDidMount() {		
        const { location, match: { params } } = this.props
        this.props.dispatcher('$$mw-ROUTE_ON_CHANGE', { location, params });

    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        const { location, match: { params } } = this.props;
        // console.log(location,params)
        this.props.dispatcher('$$mw-ROUTE_ON_CHANGE', { location, params })
        return null;
        
    }
    componentDidUpdate(nextProps) {

    }

    render() {
        // const { user, initInfoState } = this.props;
       // if (this.props.isLoginSuccess === false) {

            return (
                <React.Fragment>
                    <Header navstate={this.props.appReducer.navState} />
                    <Switch>
                        <Route exact path="/" render={() => <ProductListingContainer {...this.porps}/>} />
                        <Route exact path="/items" render={() => <ProductListingContainer propsme = {this.props}  />} />
                        {/* <Route exact path="/single" render={() => <RecipeReviewCard propsme = {this.props}  />} /> */}
                        {/* <Route component={NotFound} /> in this component we check the loglin */}
                    </Switch>
                </React.Fragment>
            )

        // } else if (this.props.isLoginSuccess === true && initInfoState) {
        //     return (
        //         <Switch>
        //             <Route exact path="/login" render={RedirectToHome} />
        //             <Route exact path="/logout" render={() => <Logout {...this.props} />} />
        //             <Route
        //                 exact
        //                 path="/sale/:saleType"
        //                 render={() => { return <SaleContainer /> }}
        //             /> 
        //             <Route exact path="/" render={() => <Redirect to={{ pathname: "/sale/shop" }} />} /> 
        //             <Route
        //                 path="/list-info/:listName"
        //                 render={
        //                     () => user.role === 'admin' ? <ListContainer /> : <Redirect to={{ pathname: "/notFound" }} />
        //                 }
        //             />
        //             <Route 
        //                 path="/finance/:financeType" 
        //                 render={
        //                     () => user.role === 'admin' ? <SewingExpenseContainer /> : <Redirect to={{ pathname: "/notFound" }} />
        //                 } 
        //             />
        //             <Route exact path="/report" render={() => <ReportContainer />} /> 
        //             <Route exact path="/inventory" render={() => <InventoryContainer />} /> 
                  //   <Route component={NotFound} /> {/* in this component we check the loglin*/}
        //         </Switch>
        //     )
        // } else { // undefined require becuase we dont want to show glitch and reload
        //     return <Spinner />
        // }
    }
}
const mapStateToProps = (props) => { // this is the props that pass to component and redux map not higher order component 
    return {
        ...props
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ dispatcher }, dispatch); 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));
