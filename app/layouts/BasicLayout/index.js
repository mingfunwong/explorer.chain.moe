/**
 *
 * BasicLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { Site, Page, AccountDropdown } from 'tabler-react';
import 'tabler-react/dist/Tabler.css';
import GlobalStyle from 'global-styles';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { current, chain } from 'utils/blockchain';
import { NavLink, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import Logo from './logo.svg';
import Search from './components/Search';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectBasicLayout from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class BasicLayout extends React.Component {
  componentWillMount() {
    const { dispatch, cookies } = this.props;
    const languageDefault =
      navigator.language.substr(0, 2) == 'zh' ||
      navigator.language.substr(0, 2) == 'ja'
        ? navigator.language.substr(0, 2)
        : 'en';
    const language =
      getQueryString('language') || cookies.get('language') || languageDefault;
    this.setState({ language });
    dispatch({ type: 'app/LanguageToggle/CHANGE_LOCALE', locale: language });
    if (getQueryString('language')) {
      cookies.set('language', language, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      });
    }
  }

  changeLanguage(language) {
    const { dispatch, cookies } = this.props;
    this.setState({ language });
    window.scrollTo(0, 0);
    dispatch({ type: 'app/LanguageToggle/CHANGE_LOCALE', locale: language });
    cookies.set('language', language, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  render() {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const pathname = window.location.pathname
      .split('/')
      .slice(2)
      .join('/');
    const accountDropdownPropsOptions = chain.getArray().map(item => ({
      value: item.name,
      badge: item.netType,
      badgeType: item.netType === 'Mainnet' ? 'primary' : 'secondary',
      to: `${protocol}//${host}/${item.bindPath[0]}/${pathname}`,
    }));
    const accountDropdownProps = {
      avatarURL: current.logo,
      name: current.name,
      description: current.netType,
      options: accountDropdownPropsOptions,
    };

    const headerChildren = (
      <React.Fragment>
        <Link to={`/${current.bindPath}`}>
          <img src={Logo} className="header-brand-img" />
        </Link>
        <div className="d-flex order-lg-2 ml-auto">
          <Search />
          <AccountDropdown {...accountDropdownProps} />
        </div>
      </React.Fragment>
    );

    const headerProps = {
      children: headerChildren,
    };

    const navBarItems = [
      {
        value: <FormattedMessage {...messages.dashboards} />,
        to: `/${current.bindPath}`,
        icon: 'home',
        LinkComponent: NavLink,
        useExact: true,
      },
      {
        value: <FormattedMessage {...messages.bp} />,
        to: `/${current.bindPath}/bps`,
        icon: ' fas fa-server',
        LinkComponent: NavLink,
        useExact: true,
      },
    ];

    const footerProps = {
      copyright: (
        <React.Fragment>© {new Date().getFullYear()} Chain Moe</React.Fragment>
      ),
      nav: (
        <React.Fragment>
          <a
            href="javascript:;"
            onClick={() => this.changeLanguage('en')}
            className={this.state.language === 'en' ? 'font-weight-bold' : ''}
          >
            English
          </a>
          &nbsp;|&nbsp;
          <a
            href="javascript:;"
            onClick={() => this.changeLanguage('zh')}
            className={this.state.language === 'zh' ? 'font-weight-bold' : ''}
          >
            简体中文
          </a>
          &nbsp;|&nbsp;
          <a
            href="javascript:;"
            onClick={() => this.changeLanguage('ja')}
            className={this.state.language === 'ja' ? 'font-weight-bold' : ''}
          >
            日本語
          </a>
        </React.Fragment>
      ),
    };

    return (
      <div>
        <GlobalStyle />
        <Helmet>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
            crossOrigin="anonymous"
          />
        </Helmet>
        <Site.Wrapper
          headerProps={headerProps}
          navProps={{ itemsObjects: navBarItems }}
          footerProps={footerProps}
        >
          <Page.Content>{this.props.children}</Page.Content>
        </Site.Wrapper>
      </div>
    );
  }
}

BasicLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  basicLayout: makeSelectBasicLayout(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'basicLayout', reducer });
const withSaga = injectSaga({ key: 'basicLayout', saga });

export default compose(
  withCookies,
  withReducer,
  withSaga,
  withConnect,
)(BasicLayout);

function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
