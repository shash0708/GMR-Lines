    <Container>
      <InputText
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='Input'
      />

      <div>
        <ExportButton onClick={handleExportPDF} disabled={selectedLogs.length === 0}>
          Export to PDF
        </ExportButton>
      </div>

      <CardContainer>
        {filteredLogs.map((log) => (
          <div className='card-item' key={log.Id}>
            <input
              type="checkbox"
              checked={selectedLogs.includes(log)}
              onChange={() => handleSelect(log)}
            />
            <Card date={new Date(log.createdAt).toLocaleDateString()} ToA={log.ToA} id={log.Id} />
          </div>
        ))}
      </CardContainer>

      <ToastContainer />  {/* Render the ToastContainer */}
    </Container>
  );
};

export default Cards;