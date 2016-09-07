import uploadcare from 'uploadcare'

export default function(publicKey, secretKey) {
	const uca = uploadcare(publicKey, secretKey)

	const fileIsReady = (uuid) => new Promise((resolve, reject) => {
		function tick() {
			try {
				uca.files.info(uuid, (infoError, infoResult) => {
					if (infoError) {
						return reject(infoError)
					}

					if (infoResult['is_ready']) {
						return resolve(infoResult)
					}

					setTimeout(tick, 333)
				})
			}
			catch (error) {
				return reject(error)
			}
		}

		setTimeout(tick, 333)
	})

	const uploadFromUrl = (url) => new Promise((resolve, reject) => {
		try {
			uca.file.fromUrl(url, (fromUrlError, fromUrlResult) => {
				if (fromUrlError) {
					return reject(fromUrlError)
				}

				return fileIsReady(fromUrlResult.uuid)
					.then((fileIsReadyResult) => resolve(fileIsReadyResult))
					.catch((fileIsReadyError) => reject(fileIsReadyError))
			})
		}
		catch (error) {
			return reject(error)
		}
	})

	const fromUrls = (urls, onSuccessUrlUpload, onFailUrlUpload) => {
		return new Promise((resolve) => {
			let promises = []

			urls.forEach((url) => {
				promises.push(new Promise((innerResolve) => {
					uploadFromUrl(url)
						.then((fileFromUrlResult) => {
							onSuccessUrlUpload(url, fileFromUrlResult)

							return innerResolve()
						})
						.catch((fileFromUrlError) => {
							onFailUrlUpload(url, fileFromUrlError)

							return innerResolve()
						})
				}))
			})

			Promise.all(promises)
				.then(() => resolve())
				.catch(() => resolve())
		})
	}

	return {
		fromUrls,
	}
}
