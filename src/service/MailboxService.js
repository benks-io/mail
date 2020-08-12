import { generateUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'

export function fetchAll(accountId) {
	const url = generateUrl('/apps/mail/api/mailboxes?accountId={accountId}', {
		accountId,
	})

	// FIXME: this return format is weird and should be avoided
	// TODO: respect `resp.data.delimiter` value
	return axios.get(url).then((resp) => resp.data.mailboxes)
}

export function create(accountId, name) {
	const url = generateUrl('/apps/mail/api/mailboxes')

	const data = {
		accountId,
		name,
	}
	return axios.post(url, data).then((resp) => resp.data)
}

export function getMailboxStatus(accountId, id) {
	const url = generateUrl('/apps/mail/api/mailboxes/{id}/stats', {
		id,
	})

	return axios.get(url).then((resp) => resp.data)
}

export function markMailboxRead(id) {
	const url = generateUrl('/apps/mail/api/mailboxes/{id}/read', {
		id,
	})

	return axios.post(url).then((resp) => resp.data)
}

export const deleteMailbox = async(id) => {
	const url = generateUrl('/apps/mail/api/mailboxes/{id}/read', {
		id,
	})

	await axios.delete(url)
}
