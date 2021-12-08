import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export const OverviewPage = ({
  ...props}) => {

  return (
    <div className='overview'>
        Test
    </div>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage)