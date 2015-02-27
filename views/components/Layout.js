var React = require('react');

var LayoutHead = require('./LayoutHead');
var LayoutBody = require('./LayoutBody');
var LayoutFoot = require('./LayoutFoot');

var assetsVersion = 'TODO';
var googleAnalyticsAccountId = 'TODO';

module.exports = React.createClass({
    propTypes: {
        canonical: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        ogImage: React.PropTypes.string,
        ogDescription: React.PropTypes.string,
    },

    render: function() {
        var ogImage = this.props.ogImage ? this.props.ogImage : 'https://flightfox.com/bundles/todsulsite/images/fox.png';
        var ogDescription = this.props.ogDescription ? this.props.ogDescription : 'Fly better for less by working with genuine flight experts.';
        var icon = "/favicon.ico?v=" + assetsVersion;

        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta property="og:url" content={this.props.canonical} />
                    <meta property="og:title" content={this.props.title} />
                    <meta property="og:image" content={ogImage} />
                    <meta property="og:description" content={ogDescription} />
                    <meta property="fb:admins" content="769892757" />

                    <link rel="canonical" href={this.props.canonical} />
                    <link rel="shortcut icon" href={icon} type="image/x-icon" />
                    <link rel="alternate" type="application/rss+xml" title="Flightfox Blog" href="https://flightfox.com/blog/feed" />

                    <title>{this.props.title}</title>
                </head>
                <body>
                    <LayoutHead />
                    <LayoutBody>
                        {this.props.children}
                    </LayoutBody>
                    <LayoutFoot bundleFile={'/public/js/dashboard.bundle.js'} />
                </body>
            </html>
        );
    }
});

// Notice some values are still hardcoded like blog/feed. It could come from a config file.
// Todo fix <script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', '{{ google_analytics.account_id }}', 'auto');ga('send', 'pageview');</script>
// Maybe add it to its own file and require it from a scrip src
