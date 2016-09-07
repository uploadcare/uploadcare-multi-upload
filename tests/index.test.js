import test from 'ava'
import getImageUrl from './get-image-url'
import uploadcareMultiUploader from '../src'
import {publicKey, secretKey} from './uploadcare-secret'

const images = []
const imagesLength = 10

for (let i = 0; i < imagesLength; i++) {
	images.push(getImageUrl(i * 100 + 100, i * 50 + 50))
}

test.cb('upload files', t => {
	t.plan(imagesLength)

	const onSuccessUpload = (sourceUrl, uploadedFile) => {
		console.log(JSON.stringify(uploadedFile))
		t.pass()
	}

	const onFailUpload = (sourceUrl, error) => {
		console.log(`${sourceUrl} with error `, error)
		t.pass()
	}

	const uploader = uploadcareMultiUploader(publicKey, secretKey)

	uploader.fromUrls(images, onSuccessUpload, onFailUpload)
		.then(() => t.end())
})

