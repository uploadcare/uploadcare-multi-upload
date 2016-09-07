import test from 'ava'
import getImageUrl from './get-image-url'
import uploadcareMultiUploader from '../src'
import {publicKey, secretKey} from './uploadcare-secret'

const images = []
const imagesLength = 10

for (let i = 0; i < imagesLength; i++) {
	images.push({
		blaField: 'blah',
		src: getImageUrl(i * 100 + 100, i * 50 + 50),
	})
}

test.cb('upload files', t => {
	t.plan(imagesLength)

	const onSuccessUpload = (image) => {
		console.log(JSON.stringify(image))
		t.pass()
	}

	const onFailUpload = (image, error) => {
		console.log('error ', image, error)
		t.pass()
	}

	const uploader = uploadcareMultiUploader(publicKey, secretKey)

	uploader.fromUrls(images, 'src', onSuccessUpload, onFailUpload)
		.then(() => t.end())
})

