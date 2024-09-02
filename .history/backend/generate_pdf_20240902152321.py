import pdfkit

# Specify the path to wkhtmltopdf executable
path_wkhtmltopdf = r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'
config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)

# Define the input and output files
input_html = 'template.html'
output_pdf = 'output.pdf'

# Generate the PDF with the specified configuration
pdfkit.from_file(input_html, output_pdf, configuration=config)
