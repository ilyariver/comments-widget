import React from 'react'
import * as ReactDom from 'react-dom'
import { MainComponent } from './containers/App'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'normalize.css'
import '@style/main'

ReactDom.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<MainComponent />
		</PersistGate>
	</Provider>,
	document.getElementById('app')
)


