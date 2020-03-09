import React from 'react';

function Layout({children}) {
  return (
    <>
    <Header />
    <div className="container">
      {children}
    </div>
    <Footer />
  </>
  )
}

export default Layout;