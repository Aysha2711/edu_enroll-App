import { useState } from "react";
import { Button } from "../components/ui/Button.jsx";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { Search, CheckCircle, XCircle, Shield, Clock } from "lucide-react";
import firestoreService from "../services/firestoreService";
import "../styles/VerifyCertificate.css";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    
    try {
      const certificates = await firestoreService.getAllCertificates();
      const certificate = certificates.find(cert => cert.id === certificateId || cert.certificateId === certificateId);
      
      if (certificate) {
        setVerificationResult({
          found: true,
          data: {
            studentName: certificate.studentName,
            courseName: certificate.course,
            issueDate: certificate.issueDate,
            certificateId: certificate.certificateId || certificate.id,
            status: certificate.status || 'completed'
          },
        });
      } else {
        setVerificationResult({
          found: false,
        });
      }
    } catch (error) {
      console.error('Error verifying certificate:', error);
      setVerificationResult({
        found: false,
      });
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full" style={{background: 'linear-gradient(135deg, #64b5f6, #3b82f6)'}}>
              <Shield className="w-12 h-12" style={{color: 'white'}} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Verify Certificate</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enter a certificate ID or student ID to verify the authenticity of an OnCode certificate
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Card className="animate-fade-in">
            <CardContent className="p-8">
              <form onSubmit={handleVerify} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <label className="input-label" htmlFor="certificateId">Certificate ID or Student ID</label>
                  <div className="relative">
                    <input
                      id="certificateId"
                      type="text"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      placeholder="e.g., CERT-1745......"
                      className="input"
                      style={{paddingRight: '2.5rem'}}
                      required
                    />
                    <Search className="absolute w-5 h-5 text-muted-foreground" style={{right: '0.75rem', top: '50%', transform: 'translateY(-50%)'}} />
                  </div>
     
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  <Search className="mr-2 w-5 h-5" />
                  Verify Certificate
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {verificationResult && certificateId && (
          <div className="max-w-2xl mx-auto animate-slide-up">
            {verificationResult.found ? (
              verificationResult.data?.status === 'pending' ? (
                <Card style={{border: '2px solid #f59e0b', boxShadow: '0 10px 40px -10px rgba(245, 158, 11, 0.3)'}}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="rounded-full p-3" style={{backgroundColor: '#f59e0b'}}>
                        <Clock className="w-8 h-8" style={{color: 'white'}} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold" style={{color: '#f59e0b'}}>Certificate Pending</h2>
                        <p className="text-muted-foreground">This certificate is currently being processed</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg" style={{backgroundColor: 'rgba(254, 243, 199, 0.5)'}}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Student Name</p>
                          <p className="font-semibold">{verificationResult.data?.studentName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Certificate ID</p>
                          <p className="font-semibold" style={{fontFamily: 'monospace'}}>{verificationResult.data?.certificateId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Course Name</p>
                          <p className="font-semibold">{verificationResult.data?.courseName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Issue Date</p>
                          <p className="font-semibold">{verificationResult.data?.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Status</p>
                          <p className="font-semibold" style={{color: '#f59e0b'}}>{verificationResult.data?.status}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card style={{border: '2px solid #22c55e', boxShadow: '0 10px 40px -10px rgba(34, 197, 94, 0.3)'}}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="rounded-full p-3" style={{backgroundColor: '#22c55e'}}>
                        <CheckCircle className="w-8 h-8" style={{color: 'white'}} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold" style={{color: '#22c55e'}}>Certificate Verified ✓</h2>
                        <p className="text-muted-foreground">This certificate is authentic and valid</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg" style={{backgroundColor: 'rgba(241, 245, 249, 0.5)'}}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Student Name</p>
                          <p className="font-semibold">{verificationResult.data?.studentName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Certificate ID</p>
                          <p className="font-semibold" style={{fontFamily: 'monospace'}}>{verificationResult.data?.certificateId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Course Name</p>
                          <p className="font-semibold">{verificationResult.data?.courseName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Issue Date</p>
                          <p className="font-semibold">{verificationResult.data?.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Status</p>
                          <p className="font-semibold" style={{color: '#22c55e'}}>{verificationResult.data?.status}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ) : (
              <Card style={{border: '2px solid #ef4444'}}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-full p-3" style={{backgroundColor: '#ef4444'}}>
                      <XCircle className="w-8 h-8" style={{color: 'white'}} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold" style={{color: '#ef4444'}}>Certificate Not Found</h2>
                      <p className="text-muted-foreground">This certificate could not be verified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;
