import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='pt'>
				<Head>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;500;700;900&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
