/**
 * WordPress dependencies
 */
const { select } = wp.data;

/**
 * Internal dependencies
 */
import getBlockFromContent from './getBlockFromContent';
import getNewFieldName from './getNewFieldName';
import saveBlock from './saveBlock';
import removeSlugFormat from './removeSlugFormat';

/**
 * Parses the block from the post content into an object.
 *
 * @return {boolean} Whether saving the field value succeeded.
 */
const addNewField = () => {
	const content = select( 'core/editor' ).getEditedPostContent();
	const block = getBlockFromContent( content ) || {};
	if ( ! block.hasOwnProperty( 'fields' ) ) {
		block.fields = {};
	}

	const newFieldName = getNewFieldName( block );
	block.fields[ newFieldName ] = {
		name: newFieldName,
		label: removeSlugFormat( newFieldName ),
	};
	saveBlock( block );

	return true;
};

export default addNewField;
