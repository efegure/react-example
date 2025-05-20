import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/reducers/store'
import { ConfigProvider, theme } from 'antd'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import RootPage from './pages/Root/RootPage'
import '@ant-design/v5-patch-for-react-19' // ? ant design fix for react v19
// import './styles/global.css'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConfigProvider
                    theme={{
                        // token: {
                        //     // Seed Token
                        //     colorPrimary: '#00b96b',
                        //     borderRadius: 2,

                        //     // Alias Token
                        //     colorBgContainer: '#f6ffed'
                        // },
                        // 1. Use dark algorithm
                        algorithm: theme.darkAlgorithm

                        // 2. Combine dark algorithm and compact algorithm
                        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                    }}
                >
                    <Router>
                        <Routes>
                            <Route path="/*" element={<RootPage />} />
                        </Routes>
                    </Router>
                </ConfigProvider>
            </PersistGate>
        </Provider>
    )
}

export default App
