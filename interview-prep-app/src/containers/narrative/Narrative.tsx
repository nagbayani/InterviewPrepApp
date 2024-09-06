import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NarrativeTips from "./NarrativeTips"; // Assuming you moved the content here

export function NarrativeTabs() {
  return (
    <Tabs
      defaultValue='narrative-tips'
      className='w-full max-w-4xl mx-auto p-6'
    >
      <TabsList className='grid grid-cols-2 mb-6'>
        <TabsTrigger value='narrative-tips'>Narrative Tips</TabsTrigger>
        <TabsTrigger value='resume-cards'>Edit Resume Cards</TabsTrigger>
      </TabsList>

      {/* First Tab: Narrative Tips */}
      <TabsContent value='narrative-tips'>
        <Card>
          <CardHeader>
            <CardTitle>Narrative Tips</CardTitle>
            <CardDescription>
              Learn how to craft a compelling narrative for your job interviews.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Render Narrative Tips Content */}
            <NarrativeTips />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Second Tab: Resume Cards Editor */}
      <TabsContent value='resume-cards'>
        <Card>
          <CardHeader>
            <CardTitle>Edit Resume Cards</CardTitle>
            <CardDescription>
              Customize and refine your resume for a job interview.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              {/* You can add your editable resume card components here */}
              <p>This is where you will be able to edit your resume cards.</p>
              <Button variant='outline'>Add New Card</Button>
              {/* Render dynamic content or cards for editing */}
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default NarrativeTabs;
