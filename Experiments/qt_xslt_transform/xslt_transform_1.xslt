<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" indent="yes"/>
	<xsl:template match="/">
		<catalog>
			<xsl:for-each select="books/book">
				<item>
					<name>TRANSFORMED_TITLE_<xsl:value-of select="title"/></name>
					<writer>TRANSFORMED_AUTHOR_<xsl:value-of select="author"/></writer>
				</item>
			</xsl:for-each>
		</catalog>
	</xsl:template>
</xsl:stylesheet>
