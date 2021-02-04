import api from 'service/axiosClient'

const postObjectDetection = ({ rawData }) => api({
  method: 'POST',
  url: '/nvision/object-detection',
  data: {
    rawData
  }
})

export {
  postObjectDetection
}