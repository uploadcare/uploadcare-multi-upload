# uploadcare-multi-upload

Upload multiple images at once with [Uploadcare REST API](https://uploadcare.com/documentation/rest/).

## Install

```
npm install uploadcare-multi-upload --save
```

## Usage

Grab your [public and secret keys](https://uploadcare.com/documentation/keys/) from project's page.

```
import uploadcareMultiUpload from 'uploadcare-multi-upload'

const multiUpload = uploadcareMultiUpload('YOUR_PUBLIC_KEY', 'YOUR_SECRET_KEY')
const images = [
	{
		id: 1,
		src: 'http://placekitten.com/300/200',
	},
	{
		id: 2,
		src: 'http://placekitten.com/600/400',
	},
]
const onSuccessUpload = (image) => {
	console.log(JSON.stringify(image))
}

const onFailUpload = (image, error) => {
	console.log('error ', image, error)
}

multiUpload.fromUrls(images, 'src', onSuccessUpload, onFailUpload)
		.then(() => console.log('All images uploaded')
```
